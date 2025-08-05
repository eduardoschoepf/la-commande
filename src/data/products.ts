import { Product } from '@/types';
import xCarneImage from '@/assets/x-carne.jpg';
import xFrangoImage from '@/assets/x-frango.jpg';
import xBaconImage from '@/assets/x-bacon.jpg';
import xTudoImage from '@/assets/x-tudo.jpg';
import xCalabreasaImage from '@/assets/x-calabresa.jpg';
import xSaladaImage from '@/assets/x-salada.jpg';
import xCoracaoImage from '@/assets/x-coracao.jpg';
import xLinguicaImage from '@/assets/x-linguica.jpg';
import cocaColaImage from '@/assets/coca-cola-2l.jpg';
import adicionaisImage from '@/assets/adicionais.jpg';

export const products: Product[] = [
  // Sanduíches
  {
    id: 'x-carne',
    name: 'X-CARNE',
    description: 'Pão, carne, maionese, ovo, ketchup, mostarda, alface, milho, ervilha e tomate.',
    price: 20.00,
    category: 'sanduiche',
    image: xCarneImage
  },
  {
    id: 'x-frango',
    name: 'X-FRANGO',
    description: 'Pão, frango, maionese, tomate, ovo, ketchup, mostarda, alface, milho e ervilha.',
    price: 20.00,
    category: 'sanduiche',
    image: xFrangoImage
  },
  {
    id: 'x-bacon',
    name: 'X-BACON',
    description: 'Pão, carne, bacon, maionese, ovo, ketchup, mostarda, alface, milho, ervilha e tomate.',
    price: 25.00,
    category: 'sanduiche',
    image: xBaconImage
  },
  {
    id: 'x-tudo',
    name: 'X-TUDO',
    description: 'Pão, carne, calabresa, bacon, frango, maionese, ketchup, mostarda, tomate, alface, ovo, queijo, presunto, milho e ervilha.',
    price: 30.00,
    category: 'sanduiche',
    image: xTudoImage
  },
  {
    id: 'x-calabresa',
    name: 'X-CALABRESA',
    description: 'Pão, calabresa, tomate, alface, maionese, ketchup, mostarda, milho, ervilha e ovo.',
    price: 25.00,
    category: 'sanduiche',
    image: xCalabreasaImage
  },
  {
    id: 'x-salada',
    name: 'X-SALADA',
    description: 'Pão, carne, presunto, queijo, maionese, ovo, ketchup, mostarda, alface, milho, ervilha e tomate.',
    price: 23.00,
    category: 'sanduiche',
    image: xSaladaImage
  },
  {
    id: 'x-coracao',
    name: 'X-CORAÇÃO',
    description: 'Pão, coração, maionese, ovo, ketchup, mostarda, alface, milho, ervilha e tomate.',
    price: 28.00,
    category: 'sanduiche',
    image: xCoracaoImage
  },
  {
    id: 'x-linguica',
    name: 'X-LINGUIÇA',
    description: 'Pão, linguiça, maionese, ovo, ketchup, mostarda, alface, ervilha e tomate.',
    price: 30.00,
    category: 'sanduiche',
    image: xLinguicaImage
  },
  // Bebidas
  {
    id: 'coca-cola-2l',
    name: 'COCA-COLA 2L',
    description: 'Refrigerante Coca-Cola 2 litros',
    price: 15.00,
    category: 'bebida',
    image: cocaColaImage
  },
  // Adicionais
  {
    id: 'cebola',
    name: 'CEBOLA',
    description: 'Adicional de cebola',
    price: 3.00,
    category: 'adicional',
    image: adicionaisImage
  },
  {
    id: 'bife',
    name: 'BIFE',
    description: 'Adicional de bife',
    price: 6.00,
    category: 'adicional',
    image: adicionaisImage
  },
  {
    id: 'ovo',
    name: 'OVO',
    description: 'Adicional de ovo',
    price: 2.00,
    category: 'adicional',
    image: adicionaisImage
  },
  {
    id: 'presunto-queijo',
    name: 'PRESUNTO E QUEIJO',
    description: 'Adicional de presunto e queijo',
    price: 3.00,
    category: 'adicional',
    image: adicionaisImage
  },
  {
    id: 'calabresa-adicional',
    name: 'CALABRESA',
    description: 'Adicional de calabresa',
    price: 6.00,
    category: 'adicional',
    image: adicionaisImage
  },
  {
    id: 'bacon-adicional',
    name: 'BACON',
    description: 'Adicional de bacon',
    price: 6.00,
    category: 'adicional',
    image: adicionaisImage
  },
  {
    id: 'maionese',
    name: 'MAIONESE',
    description: 'Adicional de maionese',
    price: 3.00,
    category: 'adicional',
    image: adicionaisImage
  }
];