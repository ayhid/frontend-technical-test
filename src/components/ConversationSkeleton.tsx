import * as React from 'react';


const ConversationsListSkeleton: React.FunctionComponent = (props) => {
  return (
    <>
    {[...Array(4).keys()].map((_, idx) =>(
        <div key={idx} className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
    </>
    
  );
};

export default ConversationsListSkeleton;
