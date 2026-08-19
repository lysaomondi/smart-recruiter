function CodewarsHeader({ user }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-medium text-indigo-600">
        Codewars Profile
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {user.username}
      </h1>
      <p className="mt-2 text-gray-500">
        Codewars performance and challenge history
      </p>
    </div>
  );
}

export default CodewarsHeader;