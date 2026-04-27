import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  const start = new Date('2025-01-01');
  const end = new Date('2030-12-31');

  const datas: { data: Date; is_feriado: boolean }[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    datas.push({
      data: new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())),
      is_feriado: false,
    });
  }

  console.log('Limpando tabela calendar...');

  await prisma.calendar.deleteMany();

  console.log(`Inserindo ${datas.length} dias...`);

  await prisma.calendar.createMany({
    data: datas,
    skipDuplicates: true,
  });

  console.log('Dias inseridos com sucesso!');

  const anos = [2025, 2026, 2027, 2028, 2029, 2030];

  const feriados = anos.flatMap((ano) => gerarFeriados(ano));

  await prisma.calendar.updateMany({
    where: {
      data: {
        in: feriados.map((d) => new Date(d + 'T00:00:00.000Z')),
      },
    },
    data: {
      is_feriado: true,
    },
  });

  console.log('Feriados atualizados com sucesso!');
  console.log('Seed finalizada!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

function calcularPascoa(ano: number): Date {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(Date.UTC(ano, mes - 1, dia));
}

function addDias(data: Date, dias: number): Date {
  const nova = new Date(data);
  nova.setUTCDate(nova.getUTCDate() + dias);
  return nova;
}

function formatar(data: Date): string {
  return data.toISOString().split('T')[0];
}

export function gerarFeriados(ano: number): string[] {
  const pascoa = calcularPascoa(ano);

  return [
    // Fixos nacionais
    `${ano}-01-01`,
    `${ano}-04-21`,
    `${ano}-05-01`,
    `${ano}-09-07`,
    `${ano}-10-12`,
    `${ano}-11-02`,
    `${ano}-11-15`,
    `${ano}-12-25`,

    // Móveis
    formatar(addDias(pascoa, -48)), // Carnaval (segunda)
    formatar(addDias(pascoa, -47)), // Carnaval (terça)
    formatar(addDias(pascoa, -2)), // Sexta-feira Santa
    formatar(addDias(pascoa, 60)), // Corpus Christi

    // Estadual MS
    `${ano}-10-11`,

    // Municipal Campo Grande
    `${ano}-08-26`,
  ];
}
