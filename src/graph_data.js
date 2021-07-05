const graph = [
  {
    nodes: [
      { id: "A", group: 1, value: 1 },
      { id: "B", group: 1, value: 3 },
      { id: "C", group: 1, value: 5 },
      { id: "D", group: 2, value: 7 },
      { id: "E", group: 2, value: 4 },
      { id: "F", group: 3, value: 6 },
      { id: "G", group: 3, value: 2 },
      { id: "H", group: 4, value: 4 },
      { id: "I", group: 4, value: 8 },
      { id: "J", group: 5, value: 6 },
      { id: "K", group: 4, value: 5 },
    ],
    links: [
      { source: "A", target: "B", value: 8 },
      { source: "C", target: "D", value: 2 },
      { source: "A", target: "C", value: 2 },
      { source: "B", target: "D", value: 4 },
      { source: "A", target: "E", value: 6 },
      { source: "A", target: "F", value: 2 },
      { source: "C", target: "F", value: 1 },
      { source: "G", target: "F", value: 1 },
      { source: "G", target: "H", value: 8 },
      { source: "F", target: "I", value: 2 },
      { source: "H", target: "J", value: 3 },
      { source: "I", target: "J", value: 4 },
      { source: "J", target: "K", value: 5 },
    ],
  },
];

export default graph;
