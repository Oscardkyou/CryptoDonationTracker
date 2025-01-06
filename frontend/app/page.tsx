'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/hooks/useWeb3';
import { useContract } from '@/hooks/useContract';

export default function Home() {
  const { account, connectWallet, disconnectWallet } = useWeb3();
  const { campaigns, loading, error } = useContract();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-bold text-center mb-4">
          Добро пожаловать в Charity Tracker
        </h1>
        <p className="text-xl text-center mb-8 max-w-2xl">
          Прозрачное отслеживание пожертвований на благотворительность с использованием технологии блокчейн.
        </p>

        {!account ? (
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={connectWallet}
          >
            Подключить кошелек
          </Button>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-600">
              Подключен аккаунт: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <Button 
              size="lg"
              variant="outline"
              onClick={disconnectWallet}
            >
              Отключить кошелек
            </Button>
          </div>
        )}

        {loading && <p className="mt-4 text-gray-600">Загрузка...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {campaigns && campaigns.length > 0 && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Активные кампании</h2>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id} 
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{campaign.description}</h3>
                  <p className="text-sm text-gray-600">
                    Собрано: {campaign.currentAmount} / {campaign.goalAmount} ETH
                  </p>
                  <div className="mt-2">
                    <Button size="sm">
                      Поддержать
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
