import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PeerService } from './peer.service';
import { Peer, PeerId } from './entities/peer.entity';
import { CreatePeerInput } from './dto/create-peer.input';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { PublicObjectResolver } from '../common/public-object/public-object.resolver';

@Resolver(() => Peer)
export class PeerResolver extends PublicObjectResolver<
  Peer,
  PeerId,
  PeerService
>(Peer, {
  findAll: 'peers',
  findOne: 'peer',
  deactivate: 'deactivatePeer',
}) {
  constructor(peerService: PeerService) {
    super(peerService);
  }

  @Mutation(() => Peer)
  @Transaction()
  createPeer(
    @Args('createPeerInput') createPeerInput: CreatePeerInput,
    @TransactionManager() em: EntityManager,
  ): Promise<Peer> {
    return this.entityService.insert(em, createPeerInput);
  }
}
