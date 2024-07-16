import React, { useState } from "react";
import { useForm } from "react-hook-form";
import QuestionLongue from "./QuestionLongue";
import QuestionCourte from "./QuestionCourte";
import MultiChoice from "./MultiChoice";
import axios from "axios";

const Form = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState("");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/api/form", data)
      .then((response) => {
        console.log(response.data);
        reset();
      })
      .catch((error) => console.error(error));
  };

  const addQuestion = (type) => {
    setQuestions([...questions, { type }]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Titre du Formulaire:</label>
        <input
          {...register("formTitle")}
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </div>

      {questions.map((question, index) => {
        if (question.type === "longue")
          return <QuestionLongue key={index} register={register} />;
        if (question.type === "courte")
          return <QuestionCourte key={index} register={register} />;
        if (question.type === "multiple")
          return <MultiChoice key={index} register={register} index={index} />;
      })}

      <div>
        <button type="button" onClick={() => addQuestion("longue")}>
          Ajouter Question Longue
        </button>
        <button type="button" onClick={() => addQuestion("courte")}>
          Ajouter Question Courte
        </button>
        <button type="button" onClick={() => addQuestion("multiple")}>
          Ajouter Choix Multiple
        </button>
      </div>

      <input type="submit" value="Envoyer le Formulaire" />
    </form>
  );
};

export default Form;
