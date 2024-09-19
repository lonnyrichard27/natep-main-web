export interface CertificateType {
  id: string;
  nin: string;
  name: string;
  email: string;
  phone: string;
  otp_hash: null;
  passcode: null;
  has_scanned_passport: number;
  state: string;
  lga: string;
  address: string;
  has_education: number;
  has_employment: number;
  has_police_report: number;
  has_medicals: number;
  user_code: string;
  has_query: number;
  status: string;
  tracking_id: string;
  request_update: string;
  photograph: any;
  agent_code: null;
  created_at: string | Date;
  updated_at: string | Date;
  passport_number: string;
  has_paid: number;
  txn_id: string;
  reference: string;
  title: string;
  expiry: string | Date;
  validity: number;
  has_delivery: number;
  surname: string;
  middlename: string;
  firstname: string;
  gender: string;
  dob: string | Date;
  certificate_id: string;
  issue_date: string | Date;
  certificate_url: string;
  is_revoked: number;
  user: string;
}

export interface VerifiedCertTypes {
  name: string;
  issue_date: string;
  status: string;
  is_valid: number;
  certificate_id: string;
}
