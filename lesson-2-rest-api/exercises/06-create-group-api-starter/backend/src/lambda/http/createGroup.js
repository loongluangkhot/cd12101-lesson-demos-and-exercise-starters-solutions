import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.GROUPS_TABLE

export async function handler(event) {
  console.log('Processing event: ', event)
  const itemId = uuidv4()

  const parsedBody = JSON.parse(event.body)
  const newItem = {
    ...parsedBody,
    id: itemId,
  }
  const params = {
    TableName : groupsTable,
    Item: newItem,
  }
  
  await dynamoDbDocument.put(params);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem
    })
  }
}