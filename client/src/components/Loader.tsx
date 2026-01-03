import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
    </div>
  );
};
