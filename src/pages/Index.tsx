import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { CheckoutForm } from '@/components/CheckoutForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { Clock, Phone, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<'all' | 'sanduiche' | 'bebida' | 'adicional'>('all');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setShowCart(false);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
    setShowCart(true);
  };

  const handleClearCart = () => {
    clearCart();
    setShowCheckout(false);
    setShowCart(false);
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all': return 'Todos';
      case 'sanduiche': return 'Sanduíches';
      case 'bebida': return 'Bebidas';
      case 'adicional': return 'Adicionais';
      default: return category;
    }
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <CheckoutForm
            cartItems={cartItems}
            totalPrice={getTotalPrice()}
            onBack={handleBackToCart}
            onClearCart={handleClearCart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground py-4 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="text-center mb-4">
            <img 
              src="/uploads/f05169d6-6da0-4c5c-afec-efbbd76434c5.png" 
              alt="La Commande" 
              className="h-20 mx-auto mb-4"
            />
            {/*<h1 className="text-3xl font-bold mb-2">XIS DO CHEF</h1>*/}
            <p className="text-lg opacity-90">NOSSO CARDÁPIO</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Horário: 18:00 às 23:00hs</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Delivery: (51) 99858-7794</span>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-48"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              {(['all', 'sanduiche', 'bebida', 'adicional'] as const).map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="text-base h-12 px-6 font-medium"
                >
                  {getCategoryLabel(category)}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block lg:w-80">
            <div className="sticky top-4">
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                totalPrice={getTotalPrice()}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>

        {/* Mobile Cart - Fixed Footer */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-lg">
          {getTotalItems() > 0 ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-semibold">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}</span>
                </div>
                <span className="text-lg font-bold text-primary">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowCart(!showCart)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Ver Carrinho
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Finalizar
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <ShoppingBag className="w-6 h-6 mx-auto mb-2 opacity-50" />
              <span>Carrinho vazio</span>
            </div>
          )}
        </div>

        {/* Mobile Cart Modal */}
        {showCart && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowCart(false)}>
            <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-lg max-h-[80vh] overflow-y-auto">
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                totalPrice={getTotalPrice()}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}

        {/* Spacer for fixed footer on mobile */}
        <div className="lg:hidden h-32"></div>
      </div>
    </div>
  );
};

export default Index;