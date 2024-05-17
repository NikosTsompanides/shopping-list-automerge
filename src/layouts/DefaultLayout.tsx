import Navbar from "./Navbar";

export default function DefaultLayout(props: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen relative">{props.children}</div>
    </>
  );
}
