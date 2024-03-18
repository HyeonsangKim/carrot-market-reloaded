export default function Home() {
  return (
    <main
      className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-400 2xl:bg-purple-300
     h-screen flex items-center justify-center p-5"
    >
      <div
        className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-4
      "
      >
        <button className="w-full h-10 bg-black text-white rounded-full">
          Submit
        </button>
      </div>
    </main>
  );
}
