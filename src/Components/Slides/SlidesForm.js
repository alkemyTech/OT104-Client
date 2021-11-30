import { useEffect, useState } from 'react';
import * as Formik from 'formik';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import * as Yup from 'yup';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

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
    const [loading, setLoading] = useState(true);
    const [totalSlides, setTotalSlides] = useState(1);
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

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = async (values) => {
        console.log(values)
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
                setLoading(false);
            } catch(err) {
                console.log(err);
            } 
        })();
    }, [slide]);

    return (
        <div>
            {loading ?
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            :
                <Formik.Formik
                    initialValues={slide || defaultValues}
                    validationSchema={SlideSchema}
                    onSubmit={async (values, {setSubmitting}) => {
                        await handleSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({dirty, isValid, touched, errors, isSubmitting, setFieldTouched, setFieldValue}) => (
                        <Formik.Form as={Form} className="p-3">
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label className={(touched.name && !errors.name) ? "text-success" : (touched.name && errors.name) ? "text-danger" : "text-body"}>Name</Form.Label>
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
                                <Form.Label className={(touched.description && !errors.description) ? "text-success" : (touched.description && errors.description) ? "text-danger" : "text-body"}>Description</Form.Label>
                                <CKEditor
                                    id="description"
                                    editor={ClassicEditor}
                                    data={slide? slide.description : ""}
                                    onBlur={() => setFieldTouched("description")}
                                    onChange={(_, editor) => setFieldValue("description", editor.getData())}
                                    disabled={isSubmitting}
                                />
                                <Formik.ErrorMessage component={Form.Text} name="description" className="text-danger" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className={(touched.image && !errors.image) ? "text-success" : (touched.image && errors.image) ? "text-danger" : "text-body"}>Image</Form.Label>
                                <InputFile
                                    name="image"
                                    onBlur={() => setFieldTouched("image")}
                                    setValue={setFieldValue}
                                    initialValue={slide? slide.image : null}
                                    isValid={touched.image && !errors.image}
                                    isInvalid={touched.image && errors.image}
                                    disabled={isSubmitting}
                                />
                                <Formik.ErrorMessage component={Form.Text} name="image" className="text-danger" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="order">
                                <Form.Label className={(touched.order && !errors.order) ? "text-success" : (touched.order && errors.order) ? "text-danger" : "text-body"}>Order</Form.Label>
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
            }
        </div>
    );
}

export default SlidesForm;