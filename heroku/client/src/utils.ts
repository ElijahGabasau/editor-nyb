//a callback for Array.prototype.filter()
//makes sure there are only unique tags
export const uniq = (value:string, index:number, self: string[]) => {
  return self.indexOf(value) === index;
}