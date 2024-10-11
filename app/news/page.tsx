export default function News() {
  const journeyItems = [
    {
      title: "Tore ACL",
      date: "April 2024",
      location: "Davis, California",
      details: "don't buy an electric skateboard",
    },
    {
      title: "Graduated highschool",
      date: "Jun 2021",
      location: "Sunnyvale, California",
      details: "408",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">News</h1>
      <div className="space-y-8">
        {journeyItems.map((item, index) => (
          <div key={index} className="border-l-4 border-[#d79921] pl-4">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">
              {item.date} · {item.location}
            </p>
            <p className="mt-2">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
