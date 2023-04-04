/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg";
declare module "*.avif" {
  const content: any;
  export default content;
}
