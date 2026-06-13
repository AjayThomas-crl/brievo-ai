import GlassSurface from "./GlassSurface.jsx";
export default function Navbar() {
  return (
    <div className="sticky top-0 pt-2 z-50 mx-auto w-fit">
      <GlassSurface width={500} height={70} borderRadius={50}>
        <div className="flex h-full w-full items-center justify-between text-white px-5">
          <h2>Brievo-AI</h2>
          <div className="flex gap-4 ">
            <h2>Home</h2>
            <h2>About me</h2>
          </div>
        </div>
      </GlassSurface>
    </div>
  );
}
