package com.example.demo.model.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse {

    @ApiModelProperty(notes = "error code")
    protected String code;
    @ApiModelProperty(notes = "error message")
    protected String message;

    public BaseResponse(String message, String code) {
        this.code = code;
        this.message = message;
    }

    public BaseResponse() {
    }

    public BaseResponse(BaseResponse baseResponse) {
        this.code = baseResponse.code;
        this.message = baseResponse.message;
    }

}
