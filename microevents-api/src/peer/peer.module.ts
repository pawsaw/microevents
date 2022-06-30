import { Module } from '@nestjs/common';
import { PeerService } from './peer.service';
import { PeerResolver } from './peer.resolver';
import { Peer } from './entities/peer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Peer])],
  providers: [PeerResolver, PeerService],
})
export class PeerModule {}
