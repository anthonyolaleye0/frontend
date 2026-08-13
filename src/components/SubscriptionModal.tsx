import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Check, Loader2, Lock, ShieldCheck, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import type { PlanType } from '../constants/types';
import useSubscriptionApis from '../services/subscriptionService';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightedFeature?: string; // e.g. "DAILY_TIPS" or "DECIDED_CASES"
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  highlightedFeature = 'DAILY_TIPS',
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>(
    'YEARLY',
  );

  const { getSubscriptionPlans, initializePayment } = useSubscriptionApis();

  // Fetch Available Subscription Plans from API
  const {
    data: plansData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: getSubscriptionPlans,
    enabled: isOpen,
  });

  const plans = plansData?.data || plansData || [];

  console.log('plans:', plans);

  // Filter plans based on active billing cycle toggle
  const filteredPlans = plans.filter(
    (plan: PlanType) =>
      plan.billingCycle?.toUpperCase() === billingCycle || !plan.billingCycle,
  );

  const handleProceedToPay = async () => {
    if (!selectedPlanId) {
      toast.error('Please select a plan to proceed.');
      return;
    }

    try {
      setIsProcessing(true);

      // Call backend to generate Paystack/Flutterwave authorization URL
      const response = await initializePayment(selectedPlanId);

      console.log('response:', response);
      const paymentUrl =
        response?.data?.authorizationUrl ||
        response?.authorizationUrl ||
        response?.data?.paymentUrl;

      if (paymentUrl) {
        toast.loading('Redirecting to secure payment checkout...');
        window.location.href = paymentUrl;
      } else {
        toast.error('Could not generate payment link. Please try again.');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(
          err?.response?.data?.message ||
            'Failed to initialize payment. Please check your network.',
        );
      } else {
        console.error('An Error occurred:', err);
        toast.error('An error occurred');
        return;
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 md:p-8 text-center shrink-0">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>Unlock Premium Features</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Choose Your Subscription Plan
          </h2>
          <p className="text-sm text-gray-300 mt-1 max-w-lg mx-auto">
            Get unrestricted access to legal precedents, tax laws, and daily
            expert tax tips directly in your dashboard.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-6 cursor-pointer inline-flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setBillingCycle('MONTHLY')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'MONTHLY'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('YEARLY')}
              className={`px-4 cursor-pointer py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'YEARLY'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-slate-50/50">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
              <p className="text-sm font-medium">
                Fetching subscription plans...
              </p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center text-red-500 text-sm font-medium">
              Failed to load plans. Please try refreshing or contact support.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPlans.length === 0 ? (
                <div className="col-span-full py-10 text-center text-gray-500 text-sm">
                  No plans available for this billing cycle.
                </div>
              ) : (
                filteredPlans.map((plan: PlanType) => {
                  const isSelected = selectedPlanId === plan._id;
                  const coversHighlight =
                    plan.allowedFeatures?.includes(highlightedFeature);

                  return (
                    <div
                      key={plan._id}
                      onClick={() => setSelectedPlanId(plan._id)}
                      className={`relative bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md ${
                        isSelected
                          ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
                          : coversHighlight
                            ? 'border-blue-200'
                            : 'border-gray-200'
                      }`}
                    >
                      {/* Badge if covers requested feature */}
                      {coversHighlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-sm tracking-wider">
                          Recommended
                        </div>
                      )}

                      <div>
                        {/* Plan Header */}
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {plan.name.toUpperCase()}
                          </h3>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 min-h-[32px] line-clamp-2">
                          {plan.description ||
                            'Complete suite for legal & tax research.'}
                        </p>

                        {/* Amount */}
                        <div className="my-4">
                          <span className="text-3xl font-black text-slate-900">
                            ₦{Number(plan.amount)}
                          </span>
                          <span className="text-xs text-gray-500 font-medium ml-1">
                            / {plan.billingCycle?.toLowerCase() || 'year'}
                          </span>
                        </div>

                        <div className="w-full h-px bg-gray-100 my-3" />

                        {/* Features List */}
                        <div className="space-y-2.5">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Included Features:
                          </p>
                          <ul className="space-y-2 text-xs text-gray-700">
                            {plan.allowedFeatures?.map(
                              (feature: string, idx: number) => {
                                const isHighlighted =
                                  feature === highlightedFeature;
                                return (
                                  <li
                                    key={idx}
                                    className={`flex items-start gap-2 ${
                                      isHighlighted
                                        ? 'font-bold text-blue-900'
                                        : ''
                                    }`}
                                  >
                                    <div className="bg-emerald-100 text-emerald-600 rounded-full p-0.5 mt-0.5 shrink-0">
                                      <Check size={10} strokeWidth={3} />
                                    </div>
                                    <span>{feature.replace(/_/g, ' ')}</span>
                                  </li>
                                );
                              },
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Select CTA */}
                      <button
                        type="button"
                        className={`mt-6 cursor-pointer w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isSelected ? 'Plan Selected' : 'Select This Plan'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-4 md:px-8 border-t border-gray-100 bg-white flex items-center justify-between gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="text-emerald-600 w-4 h-4" />
            <span>Encrypted 256-bit checkout via Paystack</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-5 cursor-pointer py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleProceedToPay}
              disabled={!selectedPlanId || isProcessing}
              className="flex cursor-pointer items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md shadow-emerald-600/20 transition-all min-w-[160px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>Proceed to Pay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
