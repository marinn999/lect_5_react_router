import { Field, Form, Formik } from "formik";

const FilterBar = ({ handleChangeQuery }) => {
  const initialValues = { query: "" };
  const handleSubmit = (values) => {
    console.log(values);
    //Коли натискаю на кнопку сабміта, в мене має записатись цей квері handleChangeQuery.
    //В Components (де консоль) шукаю UserApp, дивлюсь хуки і знаходжу пустий стейт.
    //Коли введу значення в інпут і натисну пошук, це значення передасться сюди
    handleChangeQuery(values.query);
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FilterBar;
