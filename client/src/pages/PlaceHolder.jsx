const Placeholder = ({ title }) => (
  <div className="flex-1 bg-[#F8F9FA] px-4 py-16 flex flex-col items-center justify-center h-full">
    <span className="material-symbols-outlined text-[#C4C5D7] text-6xl mb-4">
      construction
    </span>
    <h2 className="font-manrope text-2xl font-bold text-[#191C1D] mb-2">
      {title}
    </h2>
    <p className="text-[#434655]">
      This feature is coming in V2 of Thrift Savings.
    </p>
  </div>
);
export default Placeholder;
