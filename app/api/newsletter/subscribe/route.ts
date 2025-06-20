import { NextResponse } from 'next/server';
import {
  FIELD_NAMES,
  type NewsletterFormData,
} from '@/app/lib/forms.config';

// Função simples para validar e-mail
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  let formData: NewsletterFormData;

  try {
    formData = await request.json();
  } catch {
    return NextResponse.json({ message: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  const email = formData[FIELD_NAMES.EMAIL];
  const formLocation = formData[FIELD_NAMES.FORM_LOCATION];
  const consent = formData[FIELD_NAMES.CONSENT] || false;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ message: 'E-mail inválido ou ausente.' }, { status: 400 });
  }

  // TODO: Implementar a lógica de envio para o CRM aqui
  // Exemplo:
  // try {
  //   const crmResponse = await fetch('URL_DA_API_DO_SEU_CRM', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Authorization': 'Bearer SEU_CRM_API_KEY', // ou outro método de auth
  //     },
  //     body: JSON.stringify({ 
  //       email_address: email, 
  //       status: 'subscribed', 
  //       source: formLocation,
  //       consent: consent
  //       // ... outros campos que seu CRM possa exigir
  //     }),
  //   });

  //   if (!crmResponse.ok) {
  //     const errorData = await crmResponse.json();
  //     console.error('CRM Error:', errorData);
  //     return NextResponse.json({ message: 'Erro ao inscrever no CRM.', details: errorData }, { status: crmResponse.status });
  //   }
  //   return NextResponse.json({ message: 'Inscrição realizada com sucesso via CRM!' }, { status: 201 });

  // } catch (error) {
  //   console.error('API route error (CRM):', error);
  //   return NextResponse.json({ message: 'Erro interno do servidor ao contatar o CRM.' }, { status: 500 });
  // }

  // Por enquanto, simulando sucesso:
  console.log('Simulando envio para CRM:', { email, formLocation, consent });
  return NextResponse.json({ message: 'Inscrição (simulada) realizada com sucesso!' }, { status: 201 });
} 