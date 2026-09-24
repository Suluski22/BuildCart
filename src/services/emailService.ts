/**
 * Service to deliver Supply & Fix booking requests and Partner Network applications
 * to buildcartke@gmail.com
 */

export interface BookingEmailData {
  category: string;
  fullName: string;
  phone: string;
  county: string;
  estateOrTown: string;
  estimatedUnits?: string;
  startDate?: string;
  projectDetails?: string;
  estimatedAreaOrUnits?: string;
  preferredStartDate?: string;
  notes?: string;
}

export interface SupplierApplicationData {
  fullName: string;
  businessName: string;
  phone: string;
  email?: string;
  location: string; // County / Town
  categorySupplied: string;
  experience?: string;
}

export interface ProfessionalApplicationData {
  fullName: string;
  tradeBusinessName?: string;
  phone: string;
  email?: string;
  location: string; // County / Town
  primaryTrade: string;
  experience?: string;
}

export interface SendResult {
  success: boolean;
  message?: string;
  error?: string;
  needsActivation?: boolean;
}

export function formatCurrentTimeEAT(): string {
  try {
    const now = new Date();
    // Format in East Africa Time (EAT, UTC+3)
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return formatter.format(now);
  } catch {
    const now = new Date();
    return now.toISOString();
  }
}

/**
 * Sends a POST request to FormSubmit email delivery endpoint for buildcartke@gmail.com
 */
async function postToEmailEndpoint(
  recipientEmail: string,
  payload: Record<string, unknown>
): Promise<SendResult> {
  try {
    const endpoint = `https://formsubmit.co/ajax/${recipientEmail}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    if (response.ok && (result?.success === 'true' || result?.success === true)) {
      return {
        success: true,
        message: 'Application delivered successfully to buildcartke@gmail.com',
      };
    }

    // Handle FormSubmit one-time activation notice
    if (
      result?.message &&
      typeof result.message === 'string' &&
      result.message.toLowerCase().includes('activation')
    ) {
      return {
        success: false,
        needsActivation: true,
        message:
          "FormSubmit one-time activation needed: An email with an 'Activate Form' link was sent to buildcartke@gmail.com. Please open your Gmail, click 'Activate Form', and click submit again.",
      };
    }

    return {
      success: false,
      message:
        result?.message ||
        `Failed to deliver email (HTTP ${response.status}). Please check your connection or contact us on WhatsApp.`,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network request failed';
    return {
      success: false,
      message: `Network error: Could not connect to email delivery service (${errorMsg}). Please check your internet connection or reach us directly at 0729 256 365.`,
    };
  }
}

/**
 * Delivers Supply & Fix booking requests to buildcartke@gmail.com
 */
export async function sendBookingEmail(data: BookingEmailData): Promise<SendResult> {
  const recipientEmail = 'buildcartke@gmail.com';
  const currentTimeEAT = formatCurrentTimeEAT();

  const category = data.category || 'Interior Finishing';
  const fullName = data.fullName.trim();
  const phone = data.phone.trim();
  const location = `${data.estateOrTown.trim()}, ${data.county}`;
  const estimatedSize = data.estimatedUnits?.trim() || data.estimatedAreaOrUnits?.trim() || 'Not specified';
  const preferredDate = data.startDate?.trim() || data.preferredStartDate?.trim() || 'Flexible / To be confirmed';
  const projectDetails = data.projectDetails?.trim() || data.notes?.trim() || 'None provided';

  const subject = `New Supply & Fix Booking – ${category} – ${fullName}`;

  const bodyText = `New Supply & Fix Booking Request

Category: ${category}
Name: ${fullName}
Phone/WhatsApp: ${phone}
Location: ${location}
Estimated Size: ${estimatedSize}
Preferred Start Date: ${preferredDate}

Project Details:
${projectDetails}

Submitted: ${currentTimeEAT} EAT
Source: Website – Supply & Fix Booking Form`;

  const payload = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    Category: category,
    Name: fullName,
    'Phone/WhatsApp': phone,
    Location: location,
    'Estimated Size': estimatedSize,
    'Preferred Start Date': preferredDate,
    'Project Details': projectDetails,
    Submitted: `${currentTimeEAT} EAT`,
    Source: 'Website – Supply & Fix Booking Form',
    message: bodyText,
  };

  return await postToEmailEndpoint(recipientEmail, payload);
}

/**
 * Delivers Supplier Applications to buildcartke@gmail.com
 * Subject: New Supplier Application – [Business Name] – [Phone]
 */
export async function sendSupplierApplication(data: SupplierApplicationData): Promise<SendResult> {
  const recipientEmail = 'buildcartke@gmail.com';
  const currentTimeEAT = formatCurrentTimeEAT();

  const fullName = data.fullName.trim();
  const businessName = data.businessName.trim() || fullName;
  const phone = data.phone.trim();
  const email = data.email?.trim() || 'None provided';
  const location = data.location.trim();
  const categorySupplied = data.categorySupplied.trim() || 'Building Materials & Hardware';
  const experience = data.experience?.trim() || 'None provided';

  // Email Subject: New Supplier Application – [Business Name] – [Phone]
  const subject = `New Supplier Application – ${businessName} – ${phone}`;

  const bodyText = `New Supplier Application (Materials Supplier)

Full Name: ${fullName}
Business / Hardware Name: ${businessName}
Phone / WhatsApp: ${phone}
Email Address: ${email}
County / Town: ${location}
Product Category Supplied: ${categorySupplied}

Experience / Previous Projects:
${experience}

Submitted: ${currentTimeEAT} EAT
Source: Website – Partner Onboarding`;

  const payload: Record<string, unknown> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    'Application Type': 'Materials Supplier',
    'Full Name': fullName,
    'Business / Hardware Name': businessName,
    'Phone / WhatsApp': phone,
    'Email Address': email,
    'County / Town': location,
    'Product Category Supplied': categorySupplied,
    'Experience / Previous Projects': experience,
    Submitted: `${currentTimeEAT} EAT`,
    Source: 'Website – Partner Onboarding',
    message: bodyText,
  };

  if (data.email && data.email.includes('@')) {
    payload._replyto = data.email.trim();
  }

  return await postToEmailEndpoint(recipientEmail, payload);
}

/**
 * Delivers Certified Professional Applications to buildcartke@gmail.com
 * Subject: New Professional Application – [Full Name] – [Phone]
 */
export async function sendProfessionalApplication(
  data: ProfessionalApplicationData
): Promise<SendResult> {
  const recipientEmail = 'buildcartke@gmail.com';
  const currentTimeEAT = formatCurrentTimeEAT();

  const fullName = data.fullName.trim();
  const tradeBusiness = data.tradeBusinessName?.trim() || 'None provided';
  const phone = data.phone.trim();
  const email = data.email?.trim() || 'None provided';
  const location = data.location.trim();
  const primaryTrade = data.primaryTrade.trim() || 'Trades Professional';
  const experience = data.experience?.trim() || 'None provided';

  // Email Subject: New Professional Application – [Full Name] – [Phone]
  const subject = `New Professional Application – ${fullName} – ${phone}`;

  const bodyText = `New Professional Application (Certified Trades Professional)

Full Name: ${fullName}
Trade Business / Nickname: ${tradeBusiness}
Phone / WhatsApp: ${phone}
Email Address: ${email}
County / Town: ${location}
Primary Trade Specialism: ${primaryTrade}

Experience / Previous Projects:
${experience}

Submitted: ${currentTimeEAT} EAT
Source: Website – Partner Onboarding`;

  const payload: Record<string, unknown> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    'Application Type': 'Certified Trades Professional',
    'Full Name': fullName,
    'Trade Business / Nickname': tradeBusiness,
    'Phone / WhatsApp': phone,
    'Email Address': email,
    'County / Town': location,
    'Primary Trade Specialism': primaryTrade,
    'Experience / Previous Projects': experience,
    Submitted: `${currentTimeEAT} EAT`,
    Source: 'Website – Partner Onboarding',
    message: bodyText,
  };

  if (data.email && data.email.includes('@')) {
    payload._replyto = data.email.trim();
  }

  return await postToEmailEndpoint(recipientEmail, payload);
}

export interface OrderItemEmailData {
  name: string;
  quantity: number;
  unit?: string;
  unitPriceKsh: number;
  subtotalKsh: number;
  supplyAndFixIncluded: boolean;
  supplyAndFixRateKsh?: number;
  supplyAndFixLaborKsh?: number;
}

export interface OrderEmailData {
  orderRef: string;
  customerName: string;
  phone: string;
  deliveryEstate: string;
  deliveryZoneLabel: string;
  deliveryFeeKsh: number;
  paymentMethodLabel: string;
  items: OrderItemEmailData[];
  materialsSubtotalKsh: number;
  installationSubtotalKsh: number;
  grandTotalKsh: number;
}

/**
 * Delivers Order Placements to buildcartke@gmail.com
 * Subject: New Order Placed – [Order Reference] – [Customer Name] – [Phone]
 */
export async function sendOrderEmail(data: OrderEmailData): Promise<SendResult> {
  const recipientEmail = 'buildcartke@gmail.com';
  const currentTimeEAT = formatCurrentTimeEAT();

  const fullName = data.customerName.trim();
  const phone = data.phone.trim();
  const estate = data.deliveryEstate.trim();
  const zone = `${data.deliveryZoneLabel} (KSh ${data.deliveryFeeKsh.toLocaleString()})`;
  const paymentMethod = data.paymentMethodLabel;

  // Email Subject: New Order Placed – [Order Reference] – [Customer Name] – [Phone]
  const subject = `New Order Placed – ${data.orderRef} – ${fullName} – ${phone}`;

  // Build readable item summary
  const itemsTextLines = data.items.map((item, idx) => {
    let line = `${idx + 1}. ${item.name} x ${item.quantity}${item.unit ? ` ${item.unit}` : ''} @ KSh ${item.unitPriceKsh.toLocaleString()} = KSh ${item.subtotalKsh.toLocaleString()}`;
    if (item.supplyAndFixIncluded && item.supplyAndFixLaborKsh) {
      line += ` [Supply & Install included: +KSh ${item.supplyAndFixLaborKsh.toLocaleString()} (@ KSh ${item.supplyAndFixRateKsh?.toLocaleString()}/unit)]`;
    } else {
      line += ` [Supply & Install: Not selected (Materials only)]`;
    }
    return line;
  });

  const bodyText = `New Order Placed

Order Reference Number: ${data.orderRef}
Date & Time: ${currentTimeEAT} EAT
Source: Website – Checkout & Orders

CUSTOMER DETAILS:
Full Name: ${fullName}
M-Pesa / Contact Phone: ${phone}
Delivery Destination / Estate: ${estate}
Delivery Zone: ${zone}
Payment Method Selected: ${paymentMethod}

ORDER ITEMS & BREAKDOWN:
${itemsTextLines.join('\n')}

FINANCIAL BREAKDOWN:
Materials Subtotal: KSh ${data.materialsSubtotalKsh.toLocaleString()}
Supply & Install Labor: KSh ${data.installationSubtotalKsh.toLocaleString()}
Delivery Fee: KSh ${data.deliveryFeeKsh.toLocaleString()}
Total Amount: KSh ${data.grandTotalKsh.toLocaleString()}

Submitted: ${currentTimeEAT} EAT
Source: Website – Checkout & Orders`;

  const payload: Record<string, unknown> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    'Order Reference Number': data.orderRef,
    'Customer Full Name': fullName,
    'M-Pesa / Contact Phone': phone,
    'Delivery Destination / Estate': estate,
    'Delivery Zone': zone,
    'Payment Method Selected': paymentMethod,
    'Order Items & Breakdown': itemsTextLines.join('\n\n'),
    'Materials Subtotal': `KSh ${data.materialsSubtotalKsh.toLocaleString()}`,
    'Supply & Install Option Status & Fee':
      data.installationSubtotalKsh > 0
        ? `Included (+KSh ${data.installationSubtotalKsh.toLocaleString()})`
        : 'Not selected (Materials only)',
    'Delivery Fee': `KSh ${data.deliveryFeeKsh.toLocaleString()}`,
    'Total Amount (KSh)': `KSh ${data.grandTotalKsh.toLocaleString()}`,
    'Date & Time': `${currentTimeEAT} EAT`,
    Source: 'Website – Checkout & Orders',
    message: bodyText,
  };

  return await postToEmailEndpoint(recipientEmail, payload);
}

