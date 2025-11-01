import { Loader2, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchInputsProps {
  onCompare: (term1: string, term2: string) => void;
  isLoading: boolean;
}

export const SearchInputs = ({ onCompare, isLoading }: SearchInputsProps) => {
  const [term1, setTerm1] = useState('');
  const [term2, setTerm2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term1.trim() && term2.trim()) {
      onCompare(term1.trim(), term2.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="term1" className="text-base font-semibold">
            Topic 1
          </Label>
          <Input
            id="term1"
            type="text"
            placeholder="e.g., React Hooks Tutorial"
            value={term1}
            onChange={(e) => setTerm1(e.target.value)}
            disabled={isLoading}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="term2" className="text-base font-semibold">
            Topic 2
          </Label>
          <Input
            id="term2"
            type="text"
            placeholder="e.g., Vue.js Basics"
            value={term2}
            onChange={(e) => setTerm2(e.target.value)}
            disabled={isLoading}
            className="h-12"
          />
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading || !term1.trim() || !term2.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Topics...
          </>
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Compare Topics
          </>
        )}
      </Button>
    </form>
  );
};
