import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetActDto } from "./dto/get-act.dto";
import { ActResponseDto } from "./dto/act-response.dto";
import { CreateActDto } from "./dto/create-act.dto";

@Injectable()
export class ActService {
    constructor(private prismaService: PrismaService) {}
    
    async getAllActsByPlayerId(actParam: GetActDto): Promise<ActResponseDto[]> {
        try {
            const acts: ActResponseDto[] = await this.prismaService.act.findMany({
                where: {
                    player_id: actParam.player_id,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    deadline: true,
                    xp_reward: true,
                    gold_reward: true,
                    milestornes: {
                        select: {}
                    }
            });
            return acts;
        } catch (error) {
            throw error;
        }
    }
    async getActById(actParam: GetActDto): Promise<ActResponseDto> {

    }
    async createAct(createActDto: CreateActDto): Promise<ActResponseDto> {

    }
    async updateAct(actParam: GetActDto, updateActDto: CreateActDto): Promise<ActResponseDto> {

    }
    async deleteAct(actParam: GetActDto) {

    }
}