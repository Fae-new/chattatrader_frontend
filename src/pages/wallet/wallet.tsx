import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent,  
} from '../../reuseables/Card';
import { Button } from '../../reuseables/button';
import { Tabs, TabsList, TabsTrigger } from '../../reuseables/tabs';
import { Badge } from '../../reuseables/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Search, 
  Eye, EyeOff, Copy,
  Check,
  Trash2,
  WalletIcon, X, ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Token {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
  chain: 'sol' | 'eth' | 'base';
  decimals?: number;
}

interface Network {
  label: string;
  value: 'sol' | 'eth' | 'base'
}

// Mock Data
const initialTokens: Token[] = [
  { id: '1', name: 'Solana', symbol: 'SOL', amount: 0, usdValue: 0, chain: 'sol' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', amount: 0, usdValue: 0, chain: 'eth' },
  { id: '3', name: 'Base', symbol: 'ETH', amount: 0, usdValue: 0, chain: 'base' },
  { id: '4', name: 'Polygon', symbol: 'MATIC', amount: 0, usdValue: 0, chain: 'eth' },
];

const networks: Network[] = [
  { label: 'Solana', value: 'sol' },
  { label: 'Ethereum', value: 'eth' },
  { label: 'Base', value: 'base' },
];

const Wallet: React.FC = () => {
  // State
  const [selectedChain, setSelectedChain] = useState<Network['value'] | 'all'>('sol');
  const [showBalance, setShowBalance] = useState(false);
  const [showBalanceNumbers, setShowBalanceNumbers] = useState(true);
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState<number | null>(null);
  const [loadingToken, setLoadingToken] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const walletAddress = "0x1234567890abcdef";
  const truncateString= (str: string, startLength: number = 5, endLength: number = 4) => {
  return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
};


  useEffect(() => {
    if (!contractAddress) {
      setTokenSymbol('');
      setTokenDecimals(null);
      return;
    }

    // simulated token info fetch (replace later with real API call)

    const timer = setTimeout(async () => {
      setLoadingToken(true);

      try {
        const mockToken = {
           symbol: contractAddress.slice(0, 4).toUpperCase(),
           decimals: 18,
        };

        setTokenSymbol(mockToken.symbol);
        setTokenDecimals(mockToken.decimals);
        toast.success("Token info retrieved!");
      } catch (error) {
        toast.error("Failed to fetch token info")
      } finally {
        setLoadingToken(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [contractAddress]);

  // Filter tokens by selected chain
  const filteredTokens = selectedChain === 'all'
    ? tokens
    : tokens.filter(token => token.chain === selectedChain);

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
  };

  // Copy contract address
  const copyContractAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      toast.error("Failed to copy contract address");
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
      try {
       await navigator.clipboard.writeText(text);
       setCopiedText(field);
       setTimeout(() => setCopiedText(null), 2000);
      } catch (error) {
          console.error("Failed to copy");
      }
  }

  // Simulated token fetch (replace with actual blockchain call)
  const fetchTokenInfo = async () => {
    setLoadingToken(true);
    try {
      // Simulate API call to fetch token info
      setTimeout(() => {
        // Mock response
        const mockToken = {
          symbol: contractAddress.slice(0, 4).toUpperCase(),
          decimals: 18
        };
        
        setTokenSymbol(mockToken.symbol);
        setTokenDecimals(mockToken.decimals);
        setLoadingToken(false);
        toast.success("Token info retrieved!");
      }, 1000);
    } catch (error) {
      setLoadingToken(false);
      toast.error("Failed to fetch token info");
    }
  };

  // Add imported token to list
  const handleImportToken = () => {
    if (!contractAddress || !tokenSymbol || tokenDecimals === null) {
      toast.error("Please complete all token information");
      return;
    }

    const chainToUse = selectedChain === 'all' ? 'sol' : selectedChain;

    const newToken: Token = {
      id: contractAddress,
      name: tokenSymbol,
      symbol: tokenSymbol,
      amount: 0,
      usdValue: 0,
      chain: chainToUse as 'sol' | 'eth' | 'base',
      decimals: tokenDecimals
    };

    setTokens(prev => [...prev, newToken]);
    toast.success("Token imported successfully!");
    resetImportForm();
  };

  // Delete token from list
  const handleDeleteToken = (tokenId: string) => {
     setTokens(prevTokens => {
      const updatedTokens = prevTokens.filter(token => token.id !== tokenId);
      if (selectedToken?.id === tokenId) {
         setSelectedToken(null);
      }
      toast.success("Token removed successfully!");
      return updatedTokens;
     });
  };

  

  // Reset import form
  const resetImportForm = () => {
    setContractAddress('');
    setTokenSymbol('');
    setTokenDecimals(null);
    setIsImportModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen p-4">
         {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img src="/images/59.svg" alt="Profile" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-dark">Username</p>
            <p className="text-gray-400 text-xs">Wallet Address</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="p-2 rounded-full">
            <Settings />
          </Button>
          <Button className="p-2 rounded-full bg-gray-300">
            <Search />
          </Button>
        </div>
      </header>

      {/* Balance Card */}
      <Card className="bg-[#008080] rounded-[8px] mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              <div className="flex items-center gap-2 flex-shrink-0">
                <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-medium text-white truncate max-w-[160px] sm:max-w-[200px]">
                  Chattatrader Balance 
                </h2>
                <button 
                  onClick={() => setShowBalanceNumbers(!showBalanceNumbers)}
                  className="p-2 rounded-full bg-white hover:bg-gray-100 transition"
                  aria-label="Togge balance visibility">
                  {showBalanceNumbers ? <Eye /> : <EyeOff />}
                </button>
              </div>
              <div className="flex items-center gap-4 text-right text-[#FFFFFF99] ml-auto">
                <div>
                  <span className="text-sm font-[500] block">Value Risk</span>
                  <p className="text-base font-semibold">******</p>
                </div>
                <div>
                  <span className="text-sm font-[500] block">Your Risk</span>
                  <p className="text-base font-semibold">*******</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Chain Tabs */}
              <div className="flex-1 space-y-3">
                <Tabs defaultValue={selectedChain} onValueChange={setSelectedChain}>
                  <TabsList className="bg-[#ec57571a] rounded-lg">
                    {networks.map(network => (
                      <TabsTrigger
                        key={network.value}
                        value={network.value}
                        className="text-white px-4 py-2 data-[state=active]:bg-[#FFFFFF33]"
                      >
                        {network.label}
                      </TabsTrigger>
                    ))}
                    <TabsTrigger
                      value="all"
                      className="text-white px-4 py-2 data-[state=active]:bg-[#FFFFFF33]"
                    >
                      All
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Balance Details */}
               <AnimatePresence>
              <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }} >
              <div className="space-y-2 p-3 rounded-lg bg-[#03A0A0]">
               <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-white">
            {selectedChain === 'all' ? 'All Chains' : selectedChain.toUpperCase()}
          </span>
          <Badge variant="secondary" className="bg-white/20 text-white">Native</Badge>
          <span className="text-sm text-white">
            {truncateString(walletAddress)}
          </span>
          <button 
            onClick={() => copyContractAddress(walletAddress)}
            className="p-1 rounded-full hover:bg-white/20"
            aria-label="Copy wallet address"
          >
            {copiedAddress === walletAddress ? (
              <Check className="h-4 w-4 text-white" />
            ) : (
              <Copy className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
        <button
          onClick={() => setShowBalanceNumbers(!showBalanceNumbers)}
          className="p-2 rounded-full bg-white hover:bg-gray-100 transition"
          aria-label="Toggle balance visibility"
        >
          {showBalanceNumbers ? <Eye /> : <EyeOff />}
        </button>
      </div>

      {/* Balance values - Always visible, just numbers toggle */}
      <div className="flex justify-between text-white">
        <span className="text-sm opacity-70">Amount</span>
        <span className="font-medium">
          {showBalanceNumbers ? Number(0).toFixed(6) : "******"}
        </span>
      </div>
      <div className="flex justify-between text-white">
        <span className="text-sm opacity-70">USD Value</span>
        <span className="font-medium">
          {showBalanceNumbers ? `$${Number(0).toLocaleString()}` : "******"}
        </span>
      </div>
    </div>
   </motion.div>
   </AnimatePresence>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Token Lists with Clickable Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {networks.map(network => (
          <Card 
            key={network.value} 
            className="bg-white shadow border-[1px] border-[#E9E9E9] rounded-[8px]"
          >
            <CardContent className="p-4"> 
              {/* Network Header with Chain Image */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={`/images/${network.value}.svg`} 
                    alt={`${network.label} Chain`}
                    className="w-6 h-6"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/chains/placeholder-chain.svg';
                    }}
                  />
                  <h3 className="text-[18px] font-bold text-[#4F4F4F] font-poppins">
                    {network.label}
                  </h3>
                </div>
                
                {/* Import/Delete Buttons for ETH and Base */}
             {(network.value === 'eth' || network.value === 'base') && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-blue-500 md:w-[70px] border-blue-500 hover:bg-blue-50"
                      onClick={() => setIsImportModalOpen(true)}
                    >
                      Import
                    </Button>
                  </div>
                )}
              </div>
              
        {/* Tokens with Click Handler */}
          <div className="space-y-3">
            {filteredTokens
           .filter(token => token.chain === network.value)
           .map(token => (
          <div
           key={token.id}
           className="bg-white shadow border-[1px] border-[#E9E9E9] rounded-[8px] p-3 flex justify-between items-center transition w-full text-left"
           >
          <div 
           className="flex-1 flex items-center gap-3"
           onClick={() => handleTokenClick(token)}>
          <img 
            src={`/images/tokens/${token.symbol.toLowerCase()}.svg`} 
            alt={token.symbol}
            className="w-8 h-8"
            onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/solana.png';
           }}
          />
          <div>
          <p className="text-[#4F4F4F] font-medium">{token.name}</p>
          <p className="text-[#4F4F4F] text-sm">{token.amount} {token.symbol}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-[#4F4F4F]">${token.usdValue.toFixed(2)}</p>
        <p className="text-[#4F4F4F] text-sm">+0.00%</p>
      </div>
      
      {/* Delete Button (only for non-Solana tokens) */}
      {token.chain !== 'sol' && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering token click
            handleDeleteToken(token.id);
          }}
          className="ml-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Delete token"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      )}
    </div>
  ))
}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Buy Modal */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white shadow rounded-[8px] p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-[#4F4F4F]">Buy Token</h3>
              <button 
                onClick={() => setIsBuyModalOpen(false)}
                className="text-[#4F4F4F]"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                  Contract Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="Enter token contract address"
                    className="w-full px-3 py-2 border border-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
                  />
                   {loadingToken && (
                     <div className="text-center py-2">
                        <p className="text-sm text-[#7B7B7B]">Loading token info...</p>
                     </div>
                   )}
                </div>
              </div>
              
              {tokenSymbol && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                      Token Symbol
                    </label>
                    <input
                      type="text"
                      value={tokenSymbol}
                      disabled
                      className="w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                      Token Decimals
                    </label>
                    <input
                      type="number"
                      value={tokenDecimals || ''}
                      disabled
                      className="w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md"
                    />
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Button
                  onClick={handleImportToken}
                  disabled={!contractAddress || !tokenSymbol || tokenDecimals === null}
                  className="w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white"
                >
                  Buy Token
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {isSellModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white shadow rounded-[8px] p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-[#4F4F4F]">Sell Token</h3>
              <button 
                onClick={() => setIsSellModalOpen(false)}
                className="text-[#4F4F4F]"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                  Contract Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="Enter token contract address"
                    className="w-full px-3 py-2 border border-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
                  />
                  {loadingToken && (
                    <div className="text-center py-2">
                       <p className="text-sm text-[#7B7B7B]">Loading token info....</p>
                    </div>
                  )}
                </div>
              </div>
              
              {tokenSymbol && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                      Token Symbol
                    </label>
                    <input
                      type="text"
                      value={tokenSymbol}
                      disabled
                      className="w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                      Token Decimals
                    </label>
                    <input
                      type="number"
                      value={tokenDecimals || ''}
                      disabled
                      className="w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md"
                    />
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Button
                  onClick={handleImportToken}
                  disabled={!contractAddress || !tokenSymbol || tokenDecimals === null}
                  className="w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white"
                >
                  Sell Token
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Token Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white shadow rounded-[8px] p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-[#4F4F4F]">Import Token</h3>
              <button 
                onClick={resetImportForm}
                className="text-[#4F4F4F]"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                  Contract Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="Enter token contract address"
                    className="w-full px-3 py-2 border border-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500]"
                  />
                  {loadingToken && (
                    <div className='text-center py-2'>
                      <p className="text-sm text-[#7B7B7B]">Loading token info...</p>
                    </div>
                  )}
                </div>
              </div>
              
              {tokenSymbol && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                      Token Symbol
                    </label>
                    <input
                      type="text"
                      value={tokenSymbol}
                      disabled
                      className="w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#7B7B7B] mb-1">
                      Token Decimals
                    </label>
                    <input
                      type="number"
                      value={tokenDecimals || ''}
                      disabled
                      className="w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md"
                    />
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Button
                  onClick={handleImportToken}
                  disabled={!contractAddress || !tokenSymbol || tokenDecimals === null}
                  className="w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white"
                >
                  Import Token
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Token Details Modal */}
      {selectedToken && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white shadow rounded-[8px] p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-[#4F4F4F]">{selectedToken.name}</h3>
              <button 
                onClick={() => setSelectedToken(null)}
                className="text-[#4F4F4F]"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            {/* Token Details Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#7B7B7B] font-bold">Contract Address:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm truncate max-w-[150px]">
                    {selectedToken.id}
                  </span>
                  <Button 
                    onClick={() => copyToClipboard(selectedToken.id, "Contract Address")}
                    className="p-1 rounded-full cursor-pointer"
                    aria-label="Copy contract address"
                  >
                    {copiedText === "Contract Address" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ): (
                      <Copy className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#7B7B7B] font-bold">Token Name:</span>
                   <div className="flex items-center gap-2">
                      <span className="text-[#7B7B7B]">{selectedToken.name}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#7B7B7B] font-bold">Token Ticker:</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20">
                      {selectedToken.symbol}
                    </Badge>
                      <Button 
                        onClick={() => copyToClipboard(selectedToken.name, "Token Name")}
                       className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Copy token name">
                       {copiedText === "Token Name" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                       <Copy className="h-4 w-4 text-gray-400" />
                      )}
                  </Button>
                  </div>
                </div>
                <div>
                  <span className="text-[#7B7B7B] font-bold">Market Cap:</span>
                  <p className="text-[#7B7B7B]">$0</p>
                </div>
                <div>
                  <span className="text-[#7B7B7B] font-bold">Price:</span>
                  <div className="flex items-center gap-2">
                  <p className="text-[#7B7B7B]">${selectedToken.usdValue.toFixed(6)}</p>
                   <Button 
                        onClick={() => copyToClipboard(selectedToken.name, "Token Name")}
                       className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Copy token name">
                       {copiedText === "Token Name" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                       <Copy className="h-4 w-4 text-gray-400" />
                      )}
                  </Button>
                  </div>
                </div>
                <div>
                  <span className="text-[#7B7B7B] font-bold">Liquidity:</span>
                  <p className="text-[#7B7B7B]">$0</p>
                </div>
                <div>
                  <span className="text-[#7B7B7B] font-bold">24hrs Volume:</span>
                  <div className="flex items-center gap-2">
                  <p className="text-[#7B7B7B]">$0</p>
                   <Button 
                        onClick={() => copyToClipboard(selectedToken.name, "Token Name")}
                       className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Copy token name">
                       {copiedText === "Token Name" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                       <Copy className="h-4 w-4 text-gray-400" />
                      )}
                  </Button>
                  </div>
                </div>
                  <span className="text-[#7B7B7B] font-bold">1 hr Volume:</span>
                  <div className='flex items-center gap-2'>
                  <p className="text-[#7B7B7B] font-bold">$0</p>
                   <Button 
                        onClick={() => copyToClipboard(selectedToken.name, "Token Name")}
                       className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Copy token name">
                       {copiedText === "Token Name" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                       <Copy className="h-4 w-4 text-gray-400" />
                      )}
                  </Button>
                  </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button 
                  className="flex-1 bg-transparent border-[1px] 
                  border-[#CBCACA] text-[#7B7B7B] font-[500] 
                  font-poppins text-[14px] rounded-lg"
                  onClick={() => {
                    setIsSellModalOpen(true);
                    setContractAddress(selectedToken.id);
                    setTokenSymbol(selectedToken.symbol);
                    setTokenDecimals(selectedToken.decimals || 18);
                    setSelectedToken(null);
                  }}
                >
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  Sell
                </Button>
                 <Button 
                  className="flex-1 bg-[#FF9500] text-[14px] 
                  font-[500] font-poppins text-[#FAFAFA] rounded-lg"
                  onClick={() => {
                    setIsBuyModalOpen(true);
                    setContractAddress(selectedToken.id);
                    setTokenSymbol(selectedToken.symbol);
                    setTokenDecimals(selectedToken.decimals || 18);
                    setSelectedToken(null);
                  }}
                >
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;