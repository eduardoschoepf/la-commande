import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/types';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  totalPrice: number;
  onCheckout: () => void;
}

export const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, totalPrice, onCheckout }: CartProps) => {
  if (cartItems.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrinho
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Seu carrinho está vazio
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Carrinho ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{item.name}</h4>
              <p className="text-primary font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="h-12 w-12 p-0 text-lg"
              >
                <Minus className="w-5 h-5" />
              </Button>
              
              <Badge variant="secondary" className="min-w-[3rem] justify-center text-lg py-2 px-3">
                {item.quantity}
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="h-12 w-12 p-0 text-lg"
              >
                <Plus className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="h-12 w-12 p-0 text-destructive hover:text-destructive ml-2"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </div>
          
          <Button 
            onClick={onCheckout}
            className="w-full mt-4 h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Finalizar Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};