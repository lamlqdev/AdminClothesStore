export default function ErrorBlock({ title, message }) {
  return (
    <div className="bg-pink-100 my-4 p-4 rounded-md text-pink-900 flex gap-8 items-center text-left">
      <div className="text-2xl w-12 h-12 text-white bg-pink-900 rounded-full flex justify-center items-center">
        !
      </div>
      <div>
        <h2 className="text-inherit text-xl m-0">{title}</h2>
        <p className="m-0">{message}</p>
      </div>
    </div>
  );
}
