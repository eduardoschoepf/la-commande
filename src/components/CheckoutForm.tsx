import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomerData, CartItem } from '@/types';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
  onClearCart: () => void;
}

export const CheckoutForm = ({ cartItems, totalPrice, onBack, onClearCart }: CheckoutFormProps) => {
  const { toast } = useToast();
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    paymentMethod: ''
  });

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    let message = `🍔 *NOVO PEDIDO* 🍔\n\n`;
    message += `👤 *Cliente:* ${customerData.name}\n`;
    message += `📱 *Telefone:* ${customerData.phone}\n`;
    message += `📍 *Endereço:* ${customerData.address}\n`;
    message += `🏘️ *Bairro:* ${customerData.neighborhood}\n`;
    message += `💳 *Pagamento:* ${customerData.paymentMethod}\n\n`;
    
    message += `📋 *ITENS DO PEDIDO:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    message += `\n💰 *TOTAL: R$ ${totalPrice.toFixed(2).replace('.', ',')}*\n\n`;
    message += `⏰ *Horário do pedido:* ${new Date().toLocaleString('pt-BR')}`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerData.name || !customerData.phone || !customerData.address || !customerData.paymentMethod) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/5551997041908?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado para o WhatsApp. Aguarde o contato.",
    });
    
    onClearCart();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>Finalizar Pedido</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              value={customerData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone/WhatsApp *</Label>
            <Input
              id="phone"
              value={customerData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(51) 99999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço completo *</Label>
            <Textarea
              id="address"
              value={customerData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Rua, número, complemento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              value={customerData.neighborhood}
              onChange={(e) => handleInputChange('neighborhood', e.target.value)}
              placeholder="Seu bairro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Forma de pagamento *</Label>
            <Select onValueChange={(value) => handleInputChange('paymentMethod', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold mb-4">
              <span>Total:</span>
              <span className="text-primary">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Enviar pelo WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};