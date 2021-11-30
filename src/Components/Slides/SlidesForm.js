import { useEffect, useState } from 'react';
import * as Formik from 'formik';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import * as Yup from 'yup';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../FormStyles.css';

const API = axios.create({
    baseURL: 'http://ongapi.alkemy.org/api/'
});

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];

const SlideSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Name must be at least 4 characters long.')
        .required('Name is required.'),
    description: Yup.string()
        .required('Description is required.'),
    order: Yup.number()
        .required('Order is required.'),
    image: Yup.mixed()
    .test((value, {createError}) => {
        if (!value) {
            return createError({
                path: 'image',
                message: 'Image is required.'
            });
        }
        if (value.type) {
            if (!SUPPORTED_FORMATS.includes(value.type)) {
                return createError({
                    path: 'image',
                    message: `Valid formats are ${SUPPORTED_FORMATS}`
                });
            }
        }
        return true;
    })
});

const InputFile = ({name, setValue, initialValue, ...props}) => {
    const [img, setImg] = useState(initialValue);

    const handleFile = (event) => {
        setValue(name, event.currentTarget.files[0]);
        if (event.currentTarget.files[0]) {
            setImg(URL.createObjectURL(event.currentTarget.files[0]));
        } else {
            URL.revokeObjectURL(img);
            setImg(null);
        }
    }

    return (
        <Stack gap={3}>
            {img && <Image src={img} alt="" fluid style={{maxWidth: "300px"}} />}
            <Form.Control
                {...props}
                name={name}
                id={name}
                type="file"
                accept=".jpg, .png"
                onChange={handleFile}
            />
        </Stack>
    )
}

const SlidesForm = ({slide}) => {
    const [totalSlides, setTotalSlides] = useState(0);
    const [alert, setAlert] = useState({
        open: false,
        variant: '',
        title: '',
        message: ''
    });
    
    const defaultValues = {
        name: '',
        description: '',
        order: totalSlides - 1,
        image: null
    };

    const orderOptions = [];

    for (let i = 0; i < totalSlides; i++) {
        const position = i;
        orderOptions.push(<option key={position} value={position}>{position + 1}</option>);
    }

    const handleCKEditor = (editor, setValue, name) => {
        setValue(name, editor.getData());
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = async (values) =>{
        try {
            let formToSend = {};
            let { image, ...rest } = values;

            if (typeof image === 'object') {
                image = await toBase64(image);
                formToSend = {
                    image,
                    ...rest
                }
            } else {
                formToSend = {...rest}
            }

            if (slide) {
                let res = await API.put(`slides/${slide.id}`, formToSend);
                setAlert({
                    open: true,
                    variant: 'success',
                    title: 'Success',
                    message: res.data.message
                });
                return;
            }
            let res = await API.post('slides', formToSend);
            setAlert({
                open: true,
                variant: 'success',
                title: 'Success',
                message: res.data.message
            });
            return;
        } catch(err) {
            setAlert({
                open: true,
                variant: 'danger',
                title: 'Success',
                message: err.message
            });
        }
    }

    useEffect(() => {
        (async () => {
            try {
                let res = await API.get('slides');
                setTotalSlides(res.data.data.length);
            } catch(err) {
                console.log(err);
            } 
        })();
    }, [slide]);

    return (
        <div>
            <Formik.Formik
                initialValues={slide || defaultValues}
                validationSchema={SlideSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    await handleSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({dirty, touched, errors, isValid, isSubmitting, setFieldValue}) => (
                    <Formik.Form as={Form} className="p-3">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Formik.Field
                                as={Form.Control}
                                name="name"
                                isValid={touched.name && !errors.name}
                                isInvalid={touched.name && errors.name}
                                disabled={isSubmitting}
                            />
                            <Formik.ErrorMessage component={Form.Text} name="name" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as={CKEditor}
                                id="description"
                                editor={ClassicEditor}
                                data={slide? slide.description : ""}
                                onChange={(_, editor) => handleCKEditor(editor, setFieldValue, "description")}
                                disabled={isSubmitting}
                            />
                            <Formik.ErrorMessage component={Form.Text} name="description" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <InputFile
                                name="image"
                                setValue={setFieldValue}
                                initialValue={slide? slide.image : null}
                                isValid={touched.image && !errors.image}
                                isInvalid={touched.image && errors.image}
                                disabled={isSubmitting}
                            />
                            <Formik.ErrorMessage component={Form.Text} name="image" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="order">
                            <Form.Label>Order</Form.Label>
                            <Formik.Field 
                                name="order"
                                as={Form.Select}
                                isValid={touched.order && !errors.order}
                                isInvalid={touched.order && errors.order}
                                disabled={isSubmitting}
                            >
                                {orderOptions}
                            </Formik.Field>
                            <Formik.ErrorMessage component={Form.Text} name="order" className="text-danger" />
                        </Form.Group>
                        <Button type="submit" disabled={isSubmitting || !(isValid && dirty)}>Send</Button>
                        {alert.open ?
                            <Alert variant={alert.variant} onClose={() => setAlert({})} dismissible className="mb-3">
                                <Alert.Heading>{alert.title}</Alert.Heading>
                                <p>{alert.message}</p>
                            </Alert>
                        : null}
                    </Formik.Form>
                )}
            </Formik.Formik>
        </div>
    );
}

export default SlidesForm;