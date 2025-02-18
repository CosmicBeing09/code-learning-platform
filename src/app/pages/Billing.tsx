import { motion } from 'framer-motion';
import { AuthHeader } from '../components/AuthHeader';
import { Check, CreditCard, Clock, Zap, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  description: string;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'Access to all basic courses',
      'Limited code translations',
      'Community support',
      'Basic progress tracking'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 19.99,
    interval: 'month',
    isPopular: true,
    features: [
      'Access to all courses',
      'Unlimited code translations',
      'Priority support',
      'Advanced progress tracking',
      'Certificate of completion',
      'Download course materials'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    interval: 'month',
    features: [
      'Everything in Professional',
      'Custom learning paths',
      'Team management',
      'API access',
      'Dedicated support',
      'Custom integrations'
    ]
  }
];

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-15',
    amount: 19.99,
    status: 'success',
    description: 'Professional Plan - Monthly'
  },
  {
    id: '2',
    date: '2024-01-15',
    amount: 19.99,
    status: 'success',
    description: 'Professional Plan - Monthly'
  }
];

export function Billing() {
  const [currentPlan] = useState('pro');
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');

  const handleUpgrade = (planId: string) => {
    toast.info(`Upgrading to ${planId} plan...`);
    // TODO: Implement actual upgrade logic
  };

  const handleCancelSubscription = () => {
    toast.info('Processing cancellation request...');
    // TODO: Implement actual cancellation logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Billing & Subscription</h1>
          <p className="text-gray-600">
            Manage your subscription and billing information
          </p>
        </motion.div>

        {/* Current Plan Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-medium">Professional Plan</p>
              <p className="text-gray-600">Next billing date: March 15, 2024</p>
            </div>
            <button
              onClick={handleCancelSubscription}
              className="text-red-600 hover:text-red-700"
            >
              Cancel Subscription
            </button>
          </div>
        </motion.div>

        {/* Subscription Plans */}
        <div className="mb-8">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedInterval('month')}
                className={`px-4 py-2 rounded-md ${
                  selectedInterval === 'month'
                    ? 'bg-white shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedInterval('year')}
                className={`px-4 py-2 rounded-md ${
                  selectedInterval === 'year'
                    ? 'bg-white shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                Yearly
                <span className="ml-2 text-green-600 text-sm">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative bg-white rounded-lg shadow-sm p-6 ${
                  plan.isPopular ? 'border-2 border-blue-500' : 'border'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    ${selectedInterval === 'year' 
                      ? (plan.price * 0.8 * 12).toFixed(2) 
                      : plan.price}
                  </span>
                  <span className="text-gray-600">
                    /{selectedInterval}
                  </span>
                </div>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={currentPlan === plan.id}
                  className={`w-full py-2 rounded-lg ${
                    currentPlan === plan.id
                      ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {currentPlan === plan.id ? 'Current Plan' : 'Upgrade'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3 px-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{transaction.description}</td>
                    <td className="py-3 px-4">${transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          transaction.status === 'success'
                            ? 'bg-green-100 text-green-600'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 