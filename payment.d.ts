export {};

declare global {
  interface Window {
    RemitaPay: {
      init: (options: {
        rrr: string;
        txref: string;
        onSuccess: (response: any) => void;
        onFailure: (response: any) => void;
      }) => void;
    };
  }
}
