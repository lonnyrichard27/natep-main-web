export const getBenefactors = (amount: number) => {
  const AgencyCut = (62.3 / 100) * amount;
  const merchantCut = (30 / 100) * amount;
  const remitaCut = (7.7 / 100) * amount;

  const testBenefactors = [
    {
      lineItemsId: 'itemid1',
      beneficiaryName: 'Test Corporation',
      beneficiaryAccount: '0360883515',
      bankCode: '057',
      beneficiaryAmount: merchantCut,
      deductFeeFrom: '1',
    },
    {
      lineItemsId: 'itemid1',
      beneficiaryName: 'Folivi Joshua',
      beneficiaryAccount: '4017904612',
      bankCode: '058',
      beneficiaryAmount: AgencyCut,
      deductFeeFrom: '0',
    },
    {
      lineItemsId: 'itemid1',
      beneficiaryName: 'Folivi Joshua',
      beneficiaryAccount: '4017904612',
      bankCode: '058',
      beneficiaryAmount: remitaCut,
      deductFeeFrom: '0',
    },
  ];
  // return benefactors;

  const liveBenefactors = [
    {
      lineItemsId: 'itemid1',
      beneficiaryName: 'COMMONIDENTITY LTD - MWS',
      beneficiaryAccount: '1300862684',
      bankCode: '101',
      beneficiaryAmount: merchantCut,
      deductFeeFrom: '1',
    },
    {
      lineItemsId: 'itemid1',
      beneficiaryName: 'National Identity Management Commission',
      beneficiaryAccount: '0020451061012',
      bankCode: '000',
      beneficiaryAmount: AgencyCut,
      deductFeeFrom: '0',
    },
    {
      lineItemsId: 'itemid1',
      beneficiaryName: 'SystemSpecs Limited',
      beneficiaryAccount: '0001624760',
      bankCode: '044',
      beneficiaryAmount: remitaCut,
      deductFeeFrom: '0',
    },
  ];

  return process.env.NODE_ENV === 'development' ||
    window.location.host.includes('netlify.app')
    ? testBenefactors
    : liveBenefactors;
};
