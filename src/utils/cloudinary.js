export const cldUrl = (url, { width } = {}) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);
  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
};
