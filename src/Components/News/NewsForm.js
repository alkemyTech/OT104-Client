import React, { useState } from "react";
import "../../Components/FormStyles.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const NewsForm = () => {
  const [imgPreview, setImgPreview] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setInitialValues({ ...initialValues, title: e.target.value });
    }
    if (e.target.name === "image") {
      setInitialValues({ ...initialValues, image: e.target.files[0] });
      setImgPreview(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.name === "category") {
      setInitialValues({ ...initialValues, category: e.target.value });
    }
  };
  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setInitialValues({ ...initialValues, content: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialValues);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        name="title"
        placeholder="Titulo"
        value={initialValues.title || ""}
        onChange={handleChange}
      ></input>

      {imgPreview && <img src={imgPreview} alt="preview" />}
      <input
        className="input-field"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      ></input>

      <CKEditor
        name="content"
        className="input-field"
        editor={ClassicEditor}
        onChange={handleEditorChange}
      />

      <select
        className="select-field"
        name="category"
        value={initialValues.category || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select category
        </option>
        <option value="1">Demo option 1</option>
        <option value="2">Demo option 2</option>
        <option value="3">Demo option 3</option>
      </select>
      <button className="submit-btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default NewsForm;
