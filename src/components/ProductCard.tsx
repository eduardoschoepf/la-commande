import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'sanduiche': return 'Sanduíche';
      case 'bebida': return 'Bebida';
      case 'adicional': return 'Adicional';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sanduiche': return 'bg-primary';
      case 'bebida': return 'bg-blue-500';
      case 'adicional': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge className={`absolute top-2 right-2 ${getCategoryColor(product.category)} text-white text-xs`}>
          {getCategoryLabel(product.category)}
        </Badge>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
          {product.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="text-2xl font-bold text-primary">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="default"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
};