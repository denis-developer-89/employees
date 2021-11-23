function getAllMonths() {
  const months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString("en-US", { month: "long" });
  });
  return months;
}

export default getAllMonths;
