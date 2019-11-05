import UpdateItem from "../components/UpdateItem";

const update = ({ query }) => {
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
};

export default update;
