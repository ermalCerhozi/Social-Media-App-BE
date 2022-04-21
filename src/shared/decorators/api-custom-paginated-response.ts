import { applyDecorators, Type } from "@nestjs/common";
import { ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseDto } from "../dtos/response.dto";
import { PageOfDto } from "../dtos/page-of.dto";

export const ApiCustomPaginatedResponse = <MODEL extends Type<any>>(model: MODEL) => {
  return applyDecorators(
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                allOf: [
                  { $ref: getSchemaPath(PageOfDto) },
                  {
                    properties: {
                      list: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) }
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    })
  );
};
