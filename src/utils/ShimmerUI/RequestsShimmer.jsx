const RequestsShimmer = () => (
  <div className="px-4 py-10">
    <h1 className="text-3xl font-bold text-primary text-center mb-8">
      Connection Requests
    </h1>
    <div className="flex flex-col gap-6 items-center">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl bg-base-300 animate-pulse shadow-md"
        >
          <div className="w-20 h-20 rounded-full bg-base-100" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-base-100 rounded w-1/2" />
            <div className="h-3 bg-base-100 rounded w-1/3" />
            <div className="h-3 bg-base-100 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default RequestsShimmer;
