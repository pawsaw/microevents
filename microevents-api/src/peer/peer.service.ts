import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PublicObjectService } from '../common/public-object/public-object.service';
import { CreatePeerInput as CreatePeerInput } from './dto/create-peer.input';

import { Peer, PeerId } from './entities/peer.entity';

@Injectable()
export class PeerService extends PublicObjectService<Peer, PeerId> {
  constructor() {
    super(Peer, 'peer');
  }

  async insert(
    em: EntityManager,
    createPeerInput: CreatePeerInput,
  ): Promise<Peer> {
    const _peer = em.create(Peer, {
      username: createPeerInput.username,
    });

    return em.save(_peer);
  }
}
