import { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import { useWeb3 } from './useWeb3';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export interface Campaign {
  id: number;
  description: string;
  goalAmount: string;
  currentAmount: string;
  receiver: string;
  isCompleted: boolean;
}

export function useContract() {
  const { web3, account } = useWeb3();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/campaigns`);
      setCampaigns(response.data.campaigns);
      setError(null);
    } catch (err) {
      setError('Failed to fetch campaigns');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (description: string, goalAmount: string, receiver: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/campaigns`, {
        description,
        goalAmount,
        receiver
      });
      await fetchCampaigns();
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to create campaign');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const donate = async (campaignId: number, amount: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/campaigns/${campaignId}/donate`, {
        amount,
        from: account
      });
      await fetchCampaigns();
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to donate');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (web3) {
      fetchCampaigns();
    }
  }, [web3]);

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    donate,
    fetchCampaigns
  };
}
