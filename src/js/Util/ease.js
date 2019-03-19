// t:time
// b:begin
// c:change
// d:duration

export const ease = f => (t, b, c, d) => f(t / d) * c + b
export const In = f => f
export const Out = f => t => 1 - f(1 - t)
export const InOut = f => t => {
  if (t < 0.5) return f(2 * t) / 2
  else return 1 - f(2 - 2 * t) / 2
}

export const linear = x => x
export const smooth = x => (x * x * (3 - x)) / 2
export const quad = x => x * x
export const cubic = x => x * x * x
export const quart = x => x * x * x * x
export const quint = x => x * x * x * x * x
export const sine = x => 1 - Math.cos((x * Math.PI) / 2)
export const circ = x => 1 - Math.sqrt(Math.max(0, 1 - x * x))
export const exp = x => Math.pow(2, -(1 - x) * 10)
export const back = x => x * x * (2.70158 * x - 1.70158)
export const softBack = x => x * x * (2 * x - 1)
export const elastic = x =>
  56 * x * x * x * x * x - 105 * x * x * x * x + 60 * x * x * x - 10 * x * x
export const bounce = x => {
  let pow2,
    bounce = 4
  while (x < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
  return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - x, 2)
}
