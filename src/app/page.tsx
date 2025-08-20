import BarbershopItem from "@/app/components/barbershop-item";
import Header from "@/app/components/header";
import { Avatar } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { db } from "@/app/lib/prisma";
import { AvatarImage } from "@radix-ui/react-avatar";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Caio!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com SaaS Barber"
          />
        </div>

        {/* AGENDAMENTO */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/caiovellani.png" />
                </Avatar>
                <p className="text-sm">Barbearia do Caio</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        {/* RECOMENDADOS */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <footer>
        <Card className="rounded-none">
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              © 2023 Copyright
              <span className="font-bold">SaaS Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
};

export default Home;
