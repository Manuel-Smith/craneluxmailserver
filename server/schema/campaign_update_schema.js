const ajvInstance = require('./ajv_instance');

const schema = {
    type: 'object',
    properties: {
        senderEmail: {type: 'string', format: 'email'},
        senderName: {type: 'string'},
        recipient: {type: 'string'},
        subject: {type: 'string'},
        body: {type: 'string'},
        campaignType: {type: 'string'},
        campaignGoal: {type: 'string'},
        campaignStatus: {type: 'string'},
        campaignId: {type: 'string'}
    },
    required: ['campaignId'],
    additionalProperties: false // No accepting additional properties
}

module.exports = ajvInstance.compile(schema);