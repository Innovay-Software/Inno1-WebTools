export default function Error404(props: any) {
  return (
    <div
      id="error-page"
      className="w-full container flex flex-col justify-center my-24"
    >
      <h1 className="text-center font-bold text-3xl mb-16">Oops!</h1>
      <p className="text-center mb-10">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-center text-gray-400">
        <i>{props.error ?? ""}</i>
      </p>
    </div>
  );
}
