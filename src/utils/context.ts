import { v4 as uuid_v4 } from 'uuid';

export function buildContext(context: any, action: string) {
    const timestamp = new Date().toISOString();
    const message_id = uuid_v4();
    const transaction_id = (context.transaction_id) ? context.transaction_id : uuid_v4();

    if (!context) {
        throw new Error('Context not found.');
    }

    if (!context.domain) {
        throw new Error('Domain not found in context.');
    }

    const bapContext = {
        domain: context.domain,
        country: (context.country) ? context.country : process.env.country,
        city: (context.city) ? context.city : process.env.city,
        action: action,
        core_version: context.core_version,
        bap_id: process.env.subscriberId,
        bap_uri: process.env.subscriberUri,
        transaction_id: transaction_id,
        message_id: message_id,
        ttl: process.env.ttl,
        timestamp: timestamp,
        useCache: (context.useCache==true)
    }

    return bapContext;
}