export default function PageTitle(props: any) {
  return (
    <h1
      className={`transition-all text-center text-2xl font-bold my-6 md:text-5xl ${props.className}`}
      role="page-title"
    >
      {props.pageTitle}
    </h1>
  );
}
