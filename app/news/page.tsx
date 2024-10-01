export default function News() {
  const journeyItems = [
    {
      title: "Amazon - Software Engineer Intern",
      date: "Jun 2024 - Sep 2024",
      location: "Santa Clara, California",
      details:
        "Migrated Alexa reorder notification system from Java to JSLT and created low-level design for multi-ASIN reorder notifications, while getting humbled in ping pong.",
    },
    {
      title: "Amazon - Software Engineer Intern",
      date: "May 2023 - Aug 2023",
      location: "Santa Clara, California",
      details:
        "Developed an AI shopping assistant to allow customers to chat with products and got really good at ping pong.",
    },
    {
      title: "Meta - Software Engineer Intern (Enterprise)",
      date: "May 2022 - Aug 2022",
      location: "Menlo Park, California",
      details:
        "Built a highly configurable timeline for Meta employees to manage daily work flow, worked with wicked smart and friendly colleagues, and received the highest performance rating.",
    },
    {
      title: "PANS lab - Undergraduate Researcher",
      date: "Sep 2021 - Dec 2021",
      location: "Merced, California",
      details:
        "Conducted research in the field of IoT, learned Android development, and played around with structural vibration sensors.",
    },
    {
      title: "Curated - Software Engineer Intern",
      date: "Jun 2021 - Aug 2021",
      location: "San Francisco, California",
      details:
        "As the youngest person in the office, gained a good introduction to software engineering while taking full advantage of the unlimited peanut M&Ms.",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Journey</h1>
      <div className="space-y-8">
        {journeyItems.map((item, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
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
