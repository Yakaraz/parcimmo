/* eslint-disable import/prefer-default-export */
import { pick } from 'ramda'

export const paginationLots = pick([
  'content',
  'last',
  'number',
  'pageable',
  'numberOfElements',
])

export const mapDetails = pick([
  'id',
  'idLot',
  'numeroCite',
  'codeImmeuble',
  'codeBatiment',
  'codeLot',
  'adresse',
  'type',
  'nombrePieces',
  'etatDuLot',
  'nextComputationAt',
  'scheduledVisitAt',
  'scheduledVisitStatus',
  'planifiedAt',
  'surface',
  'gazDeliveryPoint',
  'electricDeliveryPoint',
  'teams',
  'users',
])
