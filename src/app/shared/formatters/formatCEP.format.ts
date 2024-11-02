export function formatCEP(cpf: string): string {
  return cpf.replace(/(\d{5})(\d{3})/, '$1-$2');
}